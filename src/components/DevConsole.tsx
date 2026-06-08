import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Cpu, RefreshCw, Sliders, MessageSquare, Terminal, X, AlertTriangle } from 'lucide-react';
import { playClick } from '../utils/audio';
import './DevConsole.css';

interface DevConsoleProps {
  isOpen: boolean;
  onClose: () => void;
}

// Use environment variable for the hash, default to empty to fail securely if missing
const MASTER_HASH = import.meta.env.VITE_DEV_CONSOLE_HASH || "";

// Simple SHA-256 implementation using Web Crypto API
async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export default function DevConsole({ isOpen, onClose }: DevConsoleProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [manualKey, setManualKey] = useState("");
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'typography' | 'ai' | 'logs'>('dashboard');
  const [logs, setLogs] = useState<{ time: string; text: string; type: 'info' | 'success' | 'warning' }[]>([]);
  
  // HUD 3D Config state
  const [config3D, setConfig3D] = useState({
    colorPreset: 'silver',
    speed: 1.0,
    roughness: 0.05,
    transmission: 1.0,
    distortion: 0.2
  });

  // HUD AI state
  const [aiPrompt, setAiPrompt] = useState("");

  // HUD Telemetry State
  const [fps, setFps] = useState(60);
  const [activeUsers, setActiveUsers] = useState(1);
  const [bypassPreloader, setBypassPreloader] = useState(false);

  // Fetch / save states
  useEffect(() => {
    // Check if previously authenticated in this session
    const isSessionAuthed = sessionStorage.getItem('1618_dev_authenticated') === 'true';
    if (isSessionAuthed) {
      setIsAuthenticated(true);
    }

    // Load 3D Config
    const savedConfig = localStorage.getItem('1618_3d_config');
    if (savedConfig) {
      setConfig3D(JSON.parse(savedConfig));
    }

    // Load AI Prompt
    const savedPrompt = localStorage.getItem('1618_ai_system_prompt');
    const defaultPrompt = `You are the official AI Representative for "1618 Digital" (a premium digital studio).
1618 Digital is a boutique 3D SaaS and Digital Studio based in Berlin. The name is inspired by the Golden Ratio (1.618), representing perfect proportions, balanced engineering, and elite digital architecture.
Founder & Director: Ömer Arslaner (Digital Architect & Director).

Our Philosophy: Proportion. Ethics. We believe in the Golden Ratio—where perfect proportion meets aesthetic perfection. We build functional aesthetics, robust digital infrastructure, and save client time. We avoid bloated code or empty promises.

Core services:
1. 3D Web & Interactive Systems (using WebGL, React Three Fiber)
2. Cinematic Video & Commercial Production
3. Intelligent Voice & Chatbot Ecosystems

Be extremely professional, direct, elite, yet helpful. Never state you are an AI assistant from OpenAI or Gemini; you are 1618 Digital's bespoke cognitive node. Keep responses concise, aligned with our high-end aesthetic.`;
    setAiPrompt(savedPrompt || defaultPrompt);

    // Load bypass preloader
    const savedBypass = localStorage.getItem('1618_bypass_preloader') === 'true';
    setBypassPreloader(savedBypass);

    // Initialize logs
    addLog("SECURITY SYSTEM INITIALIZED // WALLED GATE ACTIVE", "info");
    addLog("READING CRITICAL MODULES... R3F, WEBGL, SYSTEM_TELEMETRY", "info");
  }, []);

  // Telemetry loops
  useEffect(() => {
    if (!isAuthenticated) return;
    const interval = setInterval(() => {
      setFps(Math.round(58 + Math.random() * 4));
      setActiveUsers(Math.round(2 + Math.random() * 5));
    }, 2000);
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  const addLog = (text: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const time = new Date().toTimeString().split(' ')[0];
    setLogs(prev => [{ time, text, type }, ...prev].slice(0, 100));
  };

  // Cryptographic check
  const handleKeyVerification = async (token: string) => {
    try {
      const cleanToken = token.trim();
      const hash = await sha256(cleanToken);
      if (MASTER_HASH && hash === MASTER_HASH) {
        setIsAuthenticated(true);
        sessionStorage.setItem('1618_dev_authenticated', 'true');
        addLog("DECRYPT SUCCESS: MASTER SIGNATURE DETECTED", "success");
        addLog("DEVELOPER ACCESS GRANTED // WELCOME BACK ÖMER ARSLANER", "success");
        setAuthError(null);
      } else {
        setAuthError("CRYPTOGRAPHIC VERIFICATION FAILED // INVALID MASTER TOKEN");
        addLog("SECURITY WARN: FAILED ACCESS ATTEMPT // INVALID MASTER TOKEN", "warning");
      }
    } catch (err) {
      setAuthError("ERROR PARSING SECURITY SIGNATURE");
    }
  };

  // Drag and Drop Key File
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setAuthError(null);

    const file = e.dataTransfer.files[0];
    if (file && file.name.endsWith('.json')) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          if (json.secret_token) {
            addLog(`SCANNING SECURITY KEY FILE [ID: ${json.key_id || 'UNKNOWN'}]`, "info");
            await handleKeyVerification(json.secret_token);
          } else {
            setAuthError("INVALID KEY FORMAT // MISSING 'secret_token' FIELD");
          }
        } catch (err) {
          setAuthError("FAILED TO READ JSON KEY FILE");
        }
      };
      reader.readAsText(file);
    } else {
      setAuthError("INVALID FILE TYPE // MUST BE A .json KEY FILE");
    }
  };

  // Update Config
  const update3DConfig = (key: keyof typeof config3D, val: any) => {
    const newConfig = { ...config3D, [key]: val };
    setConfig3D(newConfig);
    localStorage.setItem('1618_3d_config', JSON.stringify(newConfig));
    // Dispatch global event for Hero3DScene to intercept
    window.dispatchEvent(new CustomEvent('1618-config-update', { detail: newConfig }));
    addLog(`MODULE UPDATE: 3D_${key.toUpperCase()} -> ${val}`, "info");
  };

  // Save AI System Prompt
  const handleSaveAiPrompt = () => {
    localStorage.setItem('1618_ai_system_prompt', aiPrompt);
    // Dispatch global event for AIChatDrawer to intercept
    window.dispatchEvent(new CustomEvent('1618-prompt-update', { detail: aiPrompt }));
    addLog("MODULE UPDATE: COGNITIVE SYSTEM PROMPT SAVED", "success");
    playClick();
  };

  // Bypass Preloader Toggle
  const handleToggleBypass = (val: boolean) => {
    setBypassPreloader(val);
    localStorage.setItem('1618_bypass_preloader', String(val));
    addLog(`BYPASS PRELOADER -> ${val ? 'ENABLED' : 'DISABLED'}`, "warning");
  };

  if (!isOpen) return null;

  return (
    <div className="dev-console-overlay">
      <AnimatePresence mode="wait">
        {!isAuthenticated ? (
          /* ── KEY GATE SCREEN ── */
          <motion.div 
            key="key-gate"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`key-gate-container ${isDragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <button className="close-console-btn" onClick={onClose}>
              <X size={18} />
            </button>
            <div className="key-gate-icon">
              <Shield size={48} />
            </div>
            <h2 className="key-gate-title">1618 CRYPTO GATEWAY</h2>
            <p className="key-gate-desc">
              Developer interface secured with SHA-256 signatures.<br/>
              Drag & drop your <code>1618-dev-key.json</code> file or enter token.
            </p>

            <div className="drop-zone">
              {isDragOver ? "DROP KEY FILE HERE" : "DRAG & DROP 1618-DEV-KEY.JSON"}
            </div>

            <input 
              type="password"
              placeholder="ENTER CRYPTO TOKEN MANUALLY"
              className="key-input"
              value={manualKey}
              onChange={(e) => setManualKey(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleKeyVerification(manualKey);
                }
              }}
            />

            {authError && (
              <div style={{ marginTop: '20px', color: '#ff4d4d', fontSize: '0.65rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <AlertTriangle size={12} />
                <span>{authError}</span>
              </div>
            )}
          </motion.div>
        ) : (
          /* ── MAIN DEVCONSOLE HUD WORKSPACE ── */
          <motion.div
            key="console-workspace"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="console-workspace"
          >
            <button className="close-console-btn" onClick={onClose} style={{ top: '25px', right: '25px' }}>
              <X size={20} />
            </button>

            {/* Sidebar Navigation */}
            <div className="console-sidebar">
              <div>
                <h3 className="sidebar-title">1618 HUD V1</h3>
                <div className="sidebar-menu">
                  <button 
                    className={`menu-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('dashboard'); playClick(); }}
                  >
                    <Cpu size={14} /> SYSTEM DASHBOARD
                  </button>
                  <button 
                    className={`menu-item ${activeTab === 'typography' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('typography'); playClick(); }}
                  >
                    <Sliders size={14} /> 3D SCENE CONTROLS
                  </button>
                  <button 
                    className={`menu-item ${activeTab === 'ai' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('ai'); playClick(); }}
                  >
                    <MessageSquare size={14} /> COGNITIVE SYSTEM
                  </button>
                  <button 
                    className={`menu-item ${activeTab === 'logs' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('logs'); playClick(); }}
                  >
                    <Terminal size={14} /> SYSTEM MONITOR
                  </button>
                </div>
              </div>

              <div className="sidebar-footer">
                STATUS // SECURE AUTH<br/>
                DEVELOPER // ÖMER ARSLANER<br/>
                BUILD // 2026.05.26_GOLDEN
              </div>
            </div>

            {/* Content Area */}
            <div className="console-content">
              {activeTab === 'dashboard' && (
                <>
                  <div className="content-section-title">
                    <span>SYSTEM DASHBOARD</span>
                    <span style={{ fontSize: '0.65rem', color: '#4ade80' }}>● ONLINE</span>
                  </div>

                  <div className="telemetry-grid">
                    <div className="telemetry-card">
                      <span className="telemetry-label">SYSTEM RESPONSIVENESS</span>
                      <span className="telemetry-value pulsing" style={{ color: '#4ade80' }}>{fps} FPS</span>
                    </div>
                    <div className="telemetry-card">
                      <span className="telemetry-label">ACTIVE SESSIONS</span>
                      <span className="telemetry-value">{activeUsers} SHARDS</span>
                    </div>
                    <div className="telemetry-card">
                      <span className="telemetry-label">CRYPTO ENGINE</span>
                      <span className="telemetry-value" style={{ fontSize: '0.85rem', fontFamily: 'monospace', color: '#60a5fa' }}>SHA-256 VALIDATED</span>
                    </div>
                  </div>

                  <div className="telemetry-card" style={{ gap: '15px' }}>
                    <span className="telemetry-label">FAST START OPTIMIZATION</span>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.6)' }}>
                        Bypass Cinematic Preloader on startup (stored in localStorage)
                      </span>
                      <input 
                        type="checkbox" 
                        checked={bypassPreloader}
                        onChange={(e) => handleToggleBypass(e.target.checked)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'typography' && (
                <>
                  <div className="content-section-title">
                    <span>3D SCENE CONTROLS</span>
                  </div>

                  <div className="control-row">
                    <span className="control-label">MATERIAL COLOR PALETTE</span>
                    <div className="color-palette-selector">
                      {[
                        { id: 'silver', color: '#e2e8f0', name: 'Platinum / Silver' },
                        { id: 'gold', color: '#D4AF37', name: 'Imperial Gold' },
                        { id: 'ruby', color: '#ff3366', name: 'Ruby Glass' },
                        { id: 'emerald', color: '#10b981', name: 'Emerald Glass' },
                        { id: 'obsidian', color: '#2a2a2a', name: 'Black Obsidian' }
                      ].map((preset) => (
                        <button
                          key={preset.id}
                          className={`color-btn ${config3D.colorPreset === preset.id ? 'active' : ''}`}
                          style={{ backgroundColor: preset.color }}
                          title={preset.name}
                          onClick={() => { update3DConfig('colorPreset', preset.id); playClick(); }}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="control-row">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="control-label">ROTATION VELOCITY</span>
                      <span className="control-label" style={{ color: '#fff' }}>{config3D.speed.toFixed(2)}x</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.0" 
                      max="3.0" 
                      step="0.05"
                      className="control-input-range"
                      value={config3D.speed}
                      onChange={(e) => update3DConfig('speed', parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="control-row">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="control-label">GLASS ROUGHNESS</span>
                      <span className="control-label" style={{ color: '#fff' }}>{config3D.roughness.toFixed(3)}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.0" 
                      max="0.5" 
                      step="0.005"
                      className="control-input-range"
                      value={config3D.roughness}
                      onChange={(e) => update3DConfig('roughness', parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="control-row">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="control-label">TRANSMISSION (GLASS OPACITY)</span>
                      <span className="control-label" style={{ color: '#fff' }}>{config3D.transmission.toFixed(2)}</span>
                    </div>
                    <input 
                      type="range" 
                      min="0.5" 
                      max="1.0" 
                      step="0.05"
                      className="control-input-range"
                      value={config3D.transmission}
                      onChange={(e) => update3DConfig('transmission', parseFloat(e.target.value))}
                    />
                  </div>
                </>
              )}

              {activeTab === 'ai' && (
                <>
                  <div className="content-section-title">
                    <span>COGNITIVE SYSTEM SETTINGS</span>
                  </div>
                  <div className="control-row">
                    <span className="control-label" style={{ marginBottom: '8px' }}>SYSTEM DIRECTIVE (SYSTEM PROMPT)</span>
                    <textarea 
                      className="ai-textarea"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                    />
                  </div>
                  <button className="console-btn-primary" onClick={handleSaveAiPrompt}>
                    UPDATE DIRECTIVE
                  </button>
                </>
              )}

              {activeTab === 'logs' && (
                <>
                  <div className="content-section-title">
                    <span>SYSTEM MONITOR</span>
                    <button 
                      style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.65rem' }}
                      onClick={() => { setLogs([]); playClick(); }}
                    >
                      <RefreshCw size={10} /> CLEAR LOGS
                    </button>
                  </div>
                  <div className="console-log-box">
                    {logs.map((log, idx) => (
                      <div key={idx} className="log-entry">
                        <span className="log-timestamp">[{log.time}]</span>
                        <span className={`log-${log.type}`}>{log.text}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
