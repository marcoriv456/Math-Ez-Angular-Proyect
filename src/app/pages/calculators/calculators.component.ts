import {AfterViewInit, Component, QueryList, ViewChildren} from '@angular/core';
import {BlobComponent} from "../../ui/shared/atoms/blob/blob.component";

@Component({
  selector: 'app-calculators',
  templateUrl: './calculators.component.html',
  styleUrl: './calculators.component.css'
})
export class CalculatorsComponent implements AfterViewInit {
  @ViewChildren(BlobComponent) blobs!: QueryList<BlobComponent>;

  async ngAfterViewInit() {
    this.blobs.forEach(blob => blob.show())
  }

}
