import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/Components/_model/client';
import { FirebaseService } from 'src/app/Components/_services/firebase.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  clients: Client[] = [];
  
  constructor(private firebaseService: FirebaseService,
              private router: Router) { }

  ngOnInit(): void {
    this.getClientsData();
  }

  getClientsData() {
    this.firebaseService.getAllUsers()
      .subscribe(data => {
        this.clients = data.map(e => {

          return {
            id: e.payload.doc.id,
            ...e.payload.doc.data() as {}
          } as Client;
        });
      console.log(this.clients);
      });
  }

  deleteClient(client: Client) {
    if(confirm("Are you sure to delete " + client.username) == true) {
      console.log(client.id);
      this.firebaseService.deleteClient(client);
     console.log('client deleted succesfuly');
    } else {
      console.log('erreur!!!');
    }
  }

  deleteClients(id: string) {
      this.firebaseService.deleteClients(id);
     alert('client deleted succesfuly');
    } 
  
  

  detailsClient(id: string) {
    this.router.navigate(['detailsClient', id]);
  }

}
