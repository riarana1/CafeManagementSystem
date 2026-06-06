import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly snackBar = inject(MatSnackBar);

  /**
   * Opens a snackbar with a message.
   * @param message The message to display.
   * @param action The label for the snackbar action.
   */
  openSnackBar(message: string, action: string = '') {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: action === 'error' ? ['error-snackbar'] : ['success-snackbar'],
    });
  }
}
