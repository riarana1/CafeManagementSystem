import { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective } from './accordion';
export { AccordionAnchorDirective, AccordionLinkDirective, AccordionDirective };

/**
 * In a standalone application, we group shared directives into a constant array.
 */
export const SHARED_ACCORDION_DIRECTIVES = [
  AccordionAnchorDirective,
  AccordionLinkDirective,
  AccordionDirective
] as const;