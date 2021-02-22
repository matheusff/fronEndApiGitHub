import { MeuRepositorioOwnerModel } from 'src/app/models/meu-repositorio-owner.model';

export class MeuRepositorioModel {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string;
    language: string;
    updated_at: Date;
    favorito: boolean;
    owner: MeuRepositorioOwnerModel;
}