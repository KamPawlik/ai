import { Component, OnInit } from '@angular/core';
import {
  blockInitialRenderAnimation,
  growAnmation,
} from '../../core/animation/animations';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [growAnmation, blockInitialRenderAnimation],
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;

  constructor() {}

  ngOnInit(): void {}
}
