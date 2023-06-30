# App

GymPass style app.

## RFs  (Requisitos Funcionais)  // É a funcionalidade em si (O usuário deve poder fazer checkin em uma academia)

- [x] Deve ser possível se cadastrar
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil e um usuário logado
- [x] Deve ser possível obter o número de checkin realizados pelo usuário logado
- [x] Deve ser possível o usuário obter seu histórico de check-ins
- [x] Deve ser possível o usuário buscar academias próximas até 10km
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar check-in em uma academia
- [x] Deve ser possível validar o check-in de um usuário
- [x] Deve ser possível se cadastrar uma academia

## RNs (Regras de negócio) // Que condições serão aplicadas para cada requisito funcional (Só pode fazer checkin em uma academia em que esteja num raio de 500m da localização do usuário)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [x] O usuário não pode fazer dois check-ins no mesmo dia
- [x] O usuário não pode fazer check-in se não estiver a 100 metros da academia
- [x] O checkin só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores


## RNFs (Requisitos não funcionais) // São requisitos técnicos da API para o dev (Qual banco de dados será utilizado, qual estratéga de paginação da API, etc,etc...)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgresSQL
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token)