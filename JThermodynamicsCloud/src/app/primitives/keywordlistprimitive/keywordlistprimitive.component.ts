import {LiveAnnouncer} from '@angular/cdk/a11y';
import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

export interface Fruit {
  name: string;
}

@Component({
	selector: 'app-keywordlistprimitive',
  templateUrl: 'keywordlistprimitive.component.html',
  styleUrl: 'keywordlistprimitive.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeywordlistprimitiveComponent {
  readonly reactiveKeywords = signal(['keyword']);
  readonly formControl = new FormControl(['angular']);

  announcer = inject(LiveAnnouncer);
  
  trackByKeyword(index: number, keyword: string): string { // Correct type for keyword
  return keyword; // Or a unique ID if you have one
}

  removeReactiveKeyword(keyword: string) {
    this.reactiveKeywords.update(keywords => {
      const index = keywords.indexOf(keyword);
      if (index < 0) {
        return keywords;
      }

      keywords.splice(index, 1);
      this.announcer.announce(`removed ${keyword} from reactive form`);
      return [...keywords];
    });
  }

setKeys(keys: string[]) {
  this.reactiveKeywords.update(() => {
    if (!keys) return [];
    const copiedKeys = JSON.parse(JSON.stringify(keys));
    return copiedKeys;
  });
}

addReactiveKeyword(event: MatChipInputEvent): void {
  const value = (event.value || '').trim();

  if (value.length > 0) {
    this.reactiveKeywords.update(keywords => {
        const newKeywords = [...keywords, value];
        return newKeywords;
    });
    this.announcer.announce(`added ${value} to reactive form`);
  }

  event.chipInput!.clear();
}
  getKeys(): string[] {
	return [...this.reactiveKeywords()];
  }
}
