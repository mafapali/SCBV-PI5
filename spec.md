# Especificação: Sistema de Chamados - Brigada Popular

## 1. Objetivo
Criar um sistema web simples e acessível para que a comunidade possa registrar chamados (problemas, denúncias ou solicitações de ajuda) e a brigada popular possa visualizar e acompanhar o status de cada solicitação.

## 2. Stack Tecnológica
* **Frontend:** HTML5, CSS3 e JavaScript (Vanilla).
* **Backend/Banco de Dados:** Supabase (PostgreSQL + API autogerada).
* **Hospedagem:** GitHub Pages.

## 3. Funcionalidades Principais
1. **Formulário de Novo Chamado:** Campos para Título, Descrição do problema, Local/Endereço e Contato (opcional).
2. **Mural de Chamados:** Uma lista visível dos chamados abertos, exibindo o status atual (Aberto, Em Andamento, Concluído).

## 4. Regras de Negócio Básicas
* Qualquer pessoa pode abrir um chamado (sem necessidade de login para facilitar o acesso).
* Por padrão, todo novo chamado entra com o status "Aberto".