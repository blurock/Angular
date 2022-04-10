import { Component, OnInit, Input, OnChanges, SimpleChanges, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-textareaprimitive',
	templateUrl: './textareaprimitive.component.html',
	styleUrls: ['./textareaprimitive.component.scss']
})
export class TextareaprimitiveComponent implements OnInit, OnChanges {

	@Input() textarea: string;

	@Input() textwidth: string;
	@Input() annolabel: string;
	@Input() annohint: string;
	@Output() textareaChange = new EventEmitter();

	textlab: string;

	constructor() { }
	ngOnChanges(changes: SimpleChanges): void {
		this.setData();
	}
	setData() {
		this.textlab = this.annolabel;
	}

	ngOnInit(): void {
	}
	textChange($event) {
		this.textarea = $event;
		this.textareaChange.emit($event);
	}
}