import { Component, OnInit } from "@angular/core";
import * as process from "process";
global.process = process;
import * as prereqs from "cbor-rn-prereqs";
import * as cbor from "cbor";

@Component({
  selector: "ns-app",
  templateUrl: "app.component.html",
})
export class AppComponent implements OnInit {
  constructor() {
    // Use the component constructor to inject providers.
  }

  ngOnInit(): void {
    this.parseAndDecode();
  }
  parseAndDecode() {
    console.log("The object");
    let object = {
      "1": "DE",
      "6": 1622316073,
      "4": 1643356073,
    };

    console.log(
      "The object ",
      object,
      " Will be encoded and decoded using cbor"
    );

    let encoded = cbor.encode(object);

    console.log("The encode object hex ", encoded.toString("hex"));
    console.log("The encode object ", encoded);

    let decoded = cbor.decode(encoded);
    let decodedString = JSON.stringify(decoded);
    console.log("the decoded string", decodedString);
  }
}
