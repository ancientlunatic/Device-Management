import { BASEURL } from "./globals";
import { formatDate1 } from "./utilities";

export class AddDevice {
    device_type_id: number ;
    device_brand_id: number ;
    device_type :string;
    device_brand :string;
    status_id: number ;
    device_model_id :string ;
    model: string;
    color: string ;
    price: string ;
    serial_number: string ;
    warranty_year: string ;
    purchase_date: string ;
    specification_id: number ;
    entry_date: string ;
    ram: string ;
    storage: string ;
    screen_size: string ;
    connectivity: string ;

    brandDropdown() {
        fetch(
            BASEURL + "/api/Device/brand"
        )
            .then(Response => Response.json())
            .then(data => {
                console.log(data);
                (document.getElementById("brand")as HTMLInputElement).innerHTML = "";
                for (let i = 0; i < data.length; i++) {

                    (document.getElementById("brand")as HTMLInputElement).innerHTML += '<option value="' + data[i].device_brand_id + '">' + data[i].device_brand + '</option>';
                    
                }
            })
            .catch(err => console.log(err));

    }
    typeDropdown() {
        fetch(
            BASEURL + "/api/Device/type"
        )
            .then(Response => Response.json())
            .then(data => {

                (document.getElementById("type")as HTMLInputElement).innerHTML = "";
                for (let i = 0; i < data.length; i++) {

                    (document.getElementById("type")as HTMLInputElement).innerHTML += '<option value="' + data[i].device_type_id + '">' + data[i].device_type + '</option>';

                }
            })
            .catch(err => console.log(err));

    }
    modelDropdown() {
        fetch(
            BASEURL + "/api/Device/model"
        )
            .then(Response => Response.json())
            .then(data => {

                (document.getElementById("model")as HTMLInputElement).innerHTML = "";
                for (let i = 0; i < data.length; i++) {

                    (document.getElementById("model")as HTMLInputElement).innerHTML += '<option value="' + data[i].device_model_id + '">' + data[i].model + '</option>';

                }
            })
            .catch(err => console.log(err));

    }
    specificationDropdown() {
        fetch(
            BASEURL + "/api/Device/specification"
        )
            .then(Response => Response.json())
            .then(data => {

                (document.getElementById("specification")as HTMLInputElement).innerHTML = "";
                for (let i = 0; i < data.length; i++) {

                    (document.getElementById("specification")as HTMLInputElement).innerHTML += '<option value="' + data[i].specification_id + '">'
                        + "RAM: " + data[i].ram + " Storage: " + data[i].storage + " Screen Size: " + data[i].screen_size + " Connectivity: " + data[i].connectivity +
                        '</option>';

                }
            })
            .catch(err => console.log(err));

    }

    Create_device() {
        let data = this.addDataFromForm();

        fetch(BASEURL + "/api/Device/add", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: data,
        }).catch(Error => console.log(Error));

    }
    async getDataToForm() {
        let data :any 
        const urlParams = new URLSearchParams(window.location.search);
        const myParam = urlParams.get("device_id");
        console.log("device_id" + myParam);
        const obj = new AddDevice();
        
       let res = await  fetch(
                  BASEURL + "/api/Device/device_id/" + myParam )
            data = await res.json();
            console.log(data);
                         this.populateDataToForm(data);
        
            return null ;
    }
    populateDataToForm(data: any) {
        console.log(data[0].device_brand_id);

        (document.getElementById("brand")as HTMLInputElement).value=data[0].device_brand_id; 
        (document.getElementById("type")as HTMLInputElement).value  = data[0].device_type_id ;
        (document.getElementById("status") as HTMLInputElement).value = data[0].status_id;
        (document.getElementById("model") as HTMLInputElement).value = data[0].model;
        (document.getElementById("color") as HTMLInputElement).value = data[0].color;
        (document.getElementById("price") as HTMLInputElement).value = data[0].price;
        (document.getElementById("serial_number") as HTMLInputElement).value = data[0].serial_number;
        (document.getElementById("warranty_year") as HTMLInputElement).value = data[0].warranty_year;
        (document.getElementById("purchase_date") as HTMLInputElement).value = formatDate1(data[0].purchase_date);
        (document.getElementById("specification")as HTMLInputElement).value = data[0].specification_id ;
        (document.getElementById("entry_date") as HTMLInputElement).value = formatDate1(data[0].entry_date);
    }
    
    update_device(device_id: any) {
        let data = this.addDataFromForm();
        console.log(data);
        fetch(BASEURL + "/api/Device/update/" + device_id, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: data,
        }).catch(Error => console.log(Error));

    }
    addDataFromForm() {
        this.device_type_id = +((document.getElementById("type") as HTMLInputElement).value);
        this.device_brand_id = +((document.getElementById("brand") as HTMLInputElement).value);
        this.status_id = +((document.getElementById("status") as HTMLInputElement).value);;
        this.model = (document.getElementById("model") as HTMLInputElement).value;
        this.color = (document.getElementById("color") as HTMLInputElement).value;
        this.price = (document.getElementById("price") as HTMLInputElement).value;
        this.serial_number = (document.getElementById("serial_number") as HTMLInputElement).value;
        this.warranty_year = (document.getElementById("warranty_year") as HTMLInputElement).value;
        this.purchase_date = (document.getElementById("purchase_date") as HTMLInputElement).value;
        this.specification_id = +((document.getElementById("specification") as HTMLInputElement).value);
        this.entry_date = (document.getElementById("entry_date") as HTMLInputElement).value;
        return JSON.stringify(this);
    }
    addDataToBrand()
    {
        
        console.log("brand");
        let data = new AddDevice();
        data.device_brand = (document.getElementById("brands")as HTMLInputElement).value;
        return JSON.stringify(data);
    }
    async addNewBrand()
    {
    
         let data1=this.addDataToBrand();
        console.log(data1);
       let data=await fetch("https://localhost:5001/api/Device/brand", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: data1,
        });
       
        return null;
    }
    addDataToType()
    {
        
        console.log("type");
        const data = new AddDevice();
        data.device_type = (document.getElementById("types")as HTMLInputElement).value;
        return JSON.stringify(data);
    }
    async addNewType()
    {
    
         let data1=this.addDataToType();
        console.log(data1);
       let data = await fetch("https://localhost:5001/api/Device/type", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: data1,
        });
        return null;
    }
    addDataToModel()
    {
        
        console.log("model");
        const data = new AddDevice();
        data.model = (document.getElementById("models")as HTMLInputElement).value;
        return JSON.stringify(data);
    }
    async addNewModel()
    {
    
         let data1=this.addDataToModel();
        console.log(data1);
       let data=await fetch("https://localhost:5001/api/Device/model", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: data1,
        });
        return null;
    }


    addDataToSpecification()
    {
        
        console.log("type");
        const data = new AddDevice();
        data.ram = (document.getElementById("RAM")as HTMLInputElement).value;
        data.storage = (document.getElementById("Storage")as HTMLInputElement).value;
        data.screen_size = (document.getElementById("Screen_size")as HTMLInputElement).value;
        data.connectivity = (document.getElementById("Connectivity")as HTMLInputElement).value;
        return JSON.stringify(data);
    }
    async addNewSpecification()
    {
    
         let data1=this.addDataToSpecification();
        console.log(data1);
        let data = await fetch("https://localhost:5001/api/Device/addspecification", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: data1,
        });
        return null;
    }
 
 
    
}
