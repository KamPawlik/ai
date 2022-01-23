import {
  animate,
  animation,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const growAnmation = trigger('grow', [
  // Note the trigger name
  transition(':enter', [
    // :enter is alias to 'void => *'
    style({ height: '0', overflow: 'hidden' }),
    animate(300, style({ height: '*' })),
  ]),
  transition(':leave', [
    // :leave is alias to '* => void'
    style({ overflow: 'hidden' }),
    animate(300, style({ height: 0, overflow: 'hidden' })),
  ]),
]);

export const blockInitialRenderAnimation = trigger(
  'blockInitialRenderAnimation',
  [transition(':enter', [])]
);
