/**
 * Fired on window by App when the intro overlay finishes. Hero listens to
 * play its entrance then. Its own module so App can fire it without
 * pulling the Hero (and the homepage chunk) into the main bundle.
 */
export const INTRO_DONE_EVENT = '1618:intro-done';
