import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'test';
  public formdata;
  public couponArr = [
    {value: 'value1'},
    {value: 'value2'},
    {value: 'value3'}
  ];
  public couponAvailability = [
    {value: 'unlimited'},
    {value: 'limited'}
  ];
  public couponStatus = [
    {value: 'status1'},
    {value: 'status2'},
    {value: 'status3'}
  ];
  public discountTypes = [
    {value: 'discount1'},
    {value: 'discount2'},
    {value: 'discount3'}
  ];
  public ruleVal = 1;
  public ruleName = "Rule" + " " + this.ruleVal;
  public Rules= [];
  public finalResponse: any = {}

  nestedForm: FormGroup;
  constructor(private _fb: FormBuilder) { }
  ngOnInit(){

   this.nestedForm = this._fb.group({
    couponType: ['',Validators.required],
    couponCode: ['', [Validators.required]],
    couponAvailabilitys: ['', [Validators.required]],
    start: ['', Validators.required],
    end: ['', Validators.required],
    couponStatuss: [''],
    textArea: [''],
    rule: this._fb.array([this.ruleGroup()])
    // address: this._fb.array([this.addAddressGroup()])
  });
  }

  submitHandler() {
    if(this.nestedForm.invalid){
      alert("Please enter all fields which marked with *");
    }
    for(var i=0; i<this.nestedForm.value.rule.length; i++){
      if(this.nestedForm.value.rule[i].maxDiscountAmount == ""){
        delete this.nestedForm.value.rule[i].maxDiscountAmount;
      }
    }
    this.finalResponse = {
      "couponCode": this.nestedForm.value.couponCode,
      "couponType": this.nestedForm.value.couponType,
      "validFrom": this.nestedForm.value.start,
      "validTo": this.nestedForm.value.end,
      "is_active": true,
      "is_unlimited" : this.nestedForm.value.couponAvailabilitys == "unlimited" ? true: false,
      "tnc": this.nestedForm.value.textArea,
      "rules" : this.nestedForm.value.rule

    }
    if(this.nestedForm.value.couponAvailabilitys == "limited"){
      this.finalResponse.coupon_count = this.nestedForm.value.rule.length
    }
    console.log(this.finalResponse)
  }

  ruleGroup() {
    this.ruleVal++;
    return this._fb.group({
      minAmount: ['', Validators.required],
      maxAmount: [''],
      DiscountType: ['', Validators.required],
      discountAmount: ['', [Validators.required]],
      maxDiscountAmount: ['']
    });
  }

  addRule() {
    this.ruleArray.push(this.ruleGroup());
  }
  get ruleArray() {
    return <FormArray>this.nestedForm.get('rule');
  }
}
