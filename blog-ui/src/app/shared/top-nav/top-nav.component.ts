import { Component } from "@angular/core";
import { KeystoneService } from "../services/keystone.service";
import { Post } from "../../types/keystone.interface";
import { FormsModule } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'top-nav',
    templateUrl: './top-nav.component.html',
    styleUrl: './top-nav.component.scss',
    imports: [FormsModule],
})

export class TopNav {
    searchTerm: string = '';
    constructor(private keystone: KeystoneService, private router: Router, private route: ActivatedRoute) {
    }
    searchPosts() {
        const url = '/search/' + this.searchTerm;
        if (this.route.toString().includes('search')) {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate([url]);
            });
        } else {
            this.router.navigate([url]);
        }
    }
}