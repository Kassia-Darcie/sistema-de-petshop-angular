import { Component, inject, Input, OnInit, viewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Pet } from '@app/models/pet';
import { PetService } from '@app/services/petService/pet.service';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PetEditFormComponent } from "../pet-edit-form/pet-edit-form.component";

@Component({
    selector: 'app-petDetails',
    imports: [ConfirmDialogModule, ButtonModule, RouterLink, PetEditFormComponent],
    providers: [PetService, ConfirmationService, MessageService],
    templateUrl: './petDetails.component.html',
    styleUrls: ['./petDetails.component.css'],
})
export class PetDetailsComponent implements OnInit {
    petService: PetService = inject(PetService);
    editForm = viewChild(PetEditFormComponent);
    pet!: Pet;

    constructor(
        private confirmationService: ConfirmationService,
        private messageService: MessageService,
        private router: Router
    ) {}

    @Input()
    set petId(petId: string) {
        this.petService.getPetById(petId).subscribe((pet) => {
            this.pet = pet;
        });
    }

    ngOnInit() {

    }

    confirmEvent(event: Event, id: string) {
        this.confirmationService.confirm({
            target: event.target as EventTarget,
            message: 'Tem certeza que deseja excluir esse pet?',
            header: 'Confirmação de exclusão',
            closable: true,
            closeOnEscape: true,
            icon: 'pi pi-exclamation-triangle',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
                outlined: true,
            },
            accept: () => {
                this.deletePet(id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Pet excluído',
                    detail: 'O pet foi excluído com sucesso',
                });
                this.router.navigate(['/pets'],{replaceUrl: true});
            },
            reject: () => {

            }
        });
    }

    editPet(pet: Pet) {
        this.editForm()!.pet = pet;
        this.editForm()!.visible = true;
    }

    handlePetUpdated(pet: Pet) {
        this.pet = {...this.pet, ...pet};
        this.petService.updatePet(pet).subscribe(res => this.pet = pet);
        console.log('Pet updated:', this.pet);
    }

    deletePet(id: string) {
        this.petService
            .deletePet(id)
            .subscribe((res) => console.log('Pet deleted:'));
    }
}
