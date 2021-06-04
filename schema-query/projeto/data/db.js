const perfis = [
    { id: 1, nome: 'Administrator', permissoes_ids: [1, 2, 3] },
    { id: 2, nome: 'Comum', permissoes_ids: [1, 3] }
]

const permissoes = [
    { id: 1, nome: 'leitura' },
    { id: 2, nome: 'escrita' },
    { id: 3, nome: 'execução' }
]

const usuarios = [{
    id: 1,
    nome: 'João Silva',
    email: 'jsilva@zemail.com',
    idade: 29,
    perfil_id: 2
}, {
    id: 2,
    nome: 'Rafael Junior',
    email: 'rafajun@wemail.com',
    idade: 31,
    perfil_id: 1
}, {
    id: 3,
    nome: 'Daniela Smith',
    email: 'danismi@uemail.com',
    idade: 24,
    perfil_id: 2
}]

module.exports = { usuarios, perfis, permissoes }