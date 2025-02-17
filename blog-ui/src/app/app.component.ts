import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BlogFooter } from './shared/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BlogFooter],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'blog-ui';
}
