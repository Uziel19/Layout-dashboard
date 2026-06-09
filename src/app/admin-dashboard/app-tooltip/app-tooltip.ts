import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
@Component({
  selector: 'app-tooltip',
  imports: [NgClass],
  templateUrl: './app-tooltip.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTooltip {

  position = input<TooltipPosition>('top');
  title = input<string>('');
  text = input<string>('');

}
