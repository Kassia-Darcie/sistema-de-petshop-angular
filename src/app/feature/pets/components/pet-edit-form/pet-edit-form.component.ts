import { Component, Input, OnInit, OnChanges, SimpleChanges, output } from '@angular/core';
import { Pet } from '@app/models/pet';
import { IftaLabelModule } from 'primeng/iftalabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TextareaModule } from 'primeng/textarea';
import { FluidModule } from 'primeng/fluid';
import { ButtonModule } from 'primeng/button';

import { DialogModule } from 'primeng/dialog';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

const P_COMPONENTS = [InputTextModule, InputNumberModule, TextareaModule, IftaLabelModule, DialogModule, FluidModule, ButtonModule];

@Component({
    selector: 'app-pet-edit-form',
    standalone: true,
    imports: [...P_COMPONENTS, ReactiveFormsModule],
    templateUrl: './pet-edit-form.component.html',
    styleUrl: './pet-edit-form.component.css'
})
export class PetEditFormComponent implements OnInit, OnChanges {
    @Input({required: true}) pet!: Pet;
    petUpdated = output<Pet>();
    visible: boolean = false;
    editForm!: FormGroup;

    ngOnInit(): void {
        this.initForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        // Reinicializar o formulário quando o pet mudar
        if (changes['pet'] && changes['pet'].currentValue) {
            console.log('Pet changed:', this.pet);
            this.initForm();
        }
    }

    initForm(): void {
        // Verificar se pet existe antes de inicializar o formulário
        if (!this.pet) {
            console.warn('Pet is undefined, form initialization delayed');
            this.editForm = new FormGroup({});
            return;
        }

        this.editForm = new FormGroup({
            nome: new FormControl(this.pet.nome),
            raca: new FormControl(this.pet.raca),
            idade: new FormControl(this.pet.idade),
            peso: new FormControl(this.pet.peso),
            cor: new FormControl(this.pet.cor),
            tutor: new FormControl(this.pet.tutor),
            emailTutor: new FormControl(this.pet.emailTutor),
        });
        console.log('Form initialized with pet:', this.pet.nome);
    }

    showDialog(): void {
        this.visible = true;
    }

    hideDialog(): void {
        this.visible = false;
    }

    saveChanges(): void {
        if (this.editForm.valid) {
            const updatedPet = { ...this.pet, ...this.editForm.value };
            this.petUpdated.emit(updatedPet);
            this.hideDialog();
        }
    }

    resetForm(): void {
        this.initForm();
    }
}
