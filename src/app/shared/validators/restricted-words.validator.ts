import { FormControl } from "@angular/forms";

export function restrictedWords(): any {
  let words = ["fuck", "cunt", "bitch", "bastard", "wanker", "shit"];

  return (control: FormControl): { [key: string]: any } => {
    if (!control.value) return null;
    if (!words) return null;

    var invalidWords = words
      .map(w => (control.value.includes(w) ? w : null))
      .filter(w => w != null);

    return invalidWords && invalidWords.length > 0
      ? { forbiddenWords: true }
      : null;
  };
}
