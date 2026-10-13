/**
 * Lets any section send the visitor to the inquiry form with a topic
 * already chosen ("Ask about a system like this" → form, "Software"
 * selected). A window event rather than shared state: the buttons and
 * the form live in unrelated parts of the tree, and the form may not be
 * mounted at all on some routes — then the event simply goes unheard.
 */
export const CONTACT_TOPICS = ['website', 'software', 'menu', 'film', 'other'] as const;
export type ContactTopic = (typeof CONTACT_TOPICS)[number];

export const CONTACT_TOPIC_EVENT = 'contact:topic';

export function requestContactTopic(topic?: ContactTopic) {
  if (topic) {
    window.dispatchEvent(new CustomEvent<ContactTopic>(CONTACT_TOPIC_EVENT, { detail: topic }));
  }
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
