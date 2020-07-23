import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListViewComponent } from '../list-view.component';
import { MatDialogModule } from '@angular/material/dialog';

describe('ListViewComponent', () => {
    let component: ListViewComponent;
    let fixture: ComponentFixture<ListViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ListViewComponent],
            imports: [MatDialogModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
