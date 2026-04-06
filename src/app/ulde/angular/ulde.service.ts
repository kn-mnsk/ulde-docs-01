import { Injectable } from '@angular/core';
import { Ulde } from '../core/ulde/ulde';

@Injectable({ providedIn: 'root' })
export class UldeService {
  constructor(public ulde: Ulde) {}
}
