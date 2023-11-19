# Sistema de Matricula

## Alunos

- Gabriel da Silva Weissheimer
- Mateus Capoani Vieira
- Matheus Vier Soares

## Como rodar

### Instalação

```bash
$ npm install
```

### Rodar aplicação

```bash
$ npm run start
```

## Endpoints

### AUTENTICACAO

POST/auth/admin/login

- Realiza login com um usuario e senha de administrador.

POST/auth/student/login

- Realiza login com um usuario e senha de estudante.

### ADMINISTRADOR:

POST /admin

- Cria um novo administrador;
- Somente com um administrador logado.

GET/admin

- Retorna todos os administradores cadastrados;
- Somente com um administrador logado.

GET/admin/:id

- Retorna os detalhes de um administrador específico;
- Somente com um administrador logado.

PUT/admin

- Edita os detalhes de um administrador existente;
- Somente com um administrador logado.

### ESTUDANTE:

POST/student

- Cria um novo estudante;
- Somente com um administrador logado.

GET/student

- Retorna todos os estudantes cadastrados;
- Somente com um administrador logado.

GET/student/:id

- Retorna os detalhes de um estudante específico;
- Somente com um administrador logado.

PUT/student

- Edita os detalhes de um estudante existente;
- Somente com um administrador logado.

### PROFESSOR:

POST/teacher

- Cria um novo professor;
- Somente com um administrador logado.

GET/teacher

- Retorna todos os professores cadastrados;
- Somente com um administrador logado.

GET/teacher/:id

- Retorna os detalhes de um professor específico;
- Somente com um administrador logado.

PUT/teacher

- Edita os detalhes de um professor existente;
- Somente com um administrador logado.

### TURMA:

POST/class/admin:

- Cria uma nova turma;
- Somente com um administrador logado.

GET/class/admin

- Retorna todas as turmas cadastradas;
- Somente com um administrador logado.

GET/class/admin/:id

- Retorna os detalhes de uma turma específica;
- Somente com um administrador logado.

PUT/class/admin

- Edita os detlhaes de uma turma existente;
- Somente com um administrador logado.

GET/class/student

- Retorna a grade de turmas para o estudante autenticado;
- Somente com um estudante logado.

POST/class/student/:classId

- Envia uma solicitação de matrícula para a turma especificada;
- Somente com um estudante logado.
