import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // time when the user started typing into the input field
  startTime: Date | undefined = undefined;
  // time took by user to type all the provided text
  finishTime: Date | undefined = undefined;

  // text to be typed by user
  text: string = this.generateRandomText();

  //text typed by user
  userTypedText: string = '';

  onChange(event: Event): void {
    if (!this.startTime) this.startTime = new Date();
    const target = event.target as HTMLInputElement;
    this.userTypedText = target.value;

    if (this.hasFinishedTyping()) {
      this.finishTime = new Date(
        new Date().getTime() - this.startTime.getTime()
      );
    }
  }

  // clear the input field if the user tries to paste the challenge text
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    this.userTypedText = '';
  }

  // restarts the typing challenge
  restart(input: HTMLInputElement): void {
    this.userTypedText = '';
    input.focus();
  }

  hasFinishedTyping(): boolean {
    return this.text === this.userTypedText;
  }
  generateRandomText(length: number = 10): string {
    let randomText: string = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < length; i++) {
      const randomNum1 = Math.floor(Math.random() * characters.length);
      const randomNum2 = Math.floor(Math.random() * characters.length);
      randomText += ` ${characters.slice(
        Math.min(randomNum1, randomNum2),
        Math.max(randomNum1, randomNum2)
      )}`;
    }
    return randomText.trim();
  }
}
