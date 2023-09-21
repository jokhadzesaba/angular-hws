import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

interface User {
  email: string;
  password: string;
  confirmPassword: string;
  agreement: true;
  nickName: string;
  phoneNumber: string;
  website: string;
  isRemoving: boolean;
}
const matchPassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.value !== confirmPassword?.value) {
    return { passwordMatch: true };
  }
  return null;
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public allUser: User[] = [];
  public editingIndex: number | null = null;
  public removeIndex: boolean = false;

  public registrationForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      agreement: [false, Validators.requiredTrue],
      nickname: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9-]+$/)]],
      phoneNumber: ['',[Validators.required, Validators.pattern(/^\+995\d{9}$/)]],
      website: ['',[Validators.required, Validators.pattern(/^https?:\/\/\S+/i)]],
    },
    {
      validators: matchPassword,
    }
  );

  constructor(private fb: FormBuilder) {}

  onSubmit() {
    const user = this.registrationForm.value;
    if (user.email && user.password && user.confirmPassword && user.phoneNumber && user.website && user.agreement && user.nickname) {
      this.allUser.push({
        email: user.email,
        password: user.password,
        confirmPassword: user.confirmPassword,
        agreement: true,
        nickName: user.nickname,
        phoneNumber: user.phoneNumber,
        website: user.website,
        isRemoving: false,
      });
    }
    this.registrationForm.reset(); ////reset
  }
  public clickRemove(index: number) {
    this.allUser[index].isRemoving = !this.allUser[index].isRemoving;
  }
  public remove(index: number) {
    this.editingIndex = null;
    this.allUser.splice(index, 1);
  }
  
  public updateForm = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/), Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      nickname: ['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9-]+$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\+995\d{9}$/)]],
      website: ['',[Validators.required, Validators.pattern(/^https?:\/\/\S+/i)]],
    },
    { validators: matchPassword }
  );
  public editUser(index: number) {
    this.editingIndex = index;
    const user = this.allUser[index];
    this.updateForm.setValue({
      email: user.email,
      nickname: user.nickName,
      password: user.password,
      confirmPassword: user.confirmPassword,
      phoneNumber: user.phoneNumber,
      website: user.website,
    });
  }
  public updateUser() {
    if (this.editingIndex !== null) {
      const updatedUser = this.updateForm.value;
      const user = this.allUser[this.editingIndex];
      user.email = updatedUser.email!;
      user.nickName = updatedUser.nickname!;
      user.phoneNumber = updatedUser.phoneNumber!;
      user.website = updatedUser.website!;
      if (updatedUser.password !== updatedUser.confirmPassword) {
        throw new Error('ggmate');
      }
      user.password = updatedUser.password!;
      user.confirmPassword = updatedUser.confirmPassword!;

      if (updatedUser.password) {
        user.password = updatedUser.password;
      }
      this.editingIndex = null;
      this.updateForm.reset();
    }
  }
}
