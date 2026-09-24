-- Cria a tabela de chamados
CREATE TABLE chamados (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    local_endereco TEXT NOT NULL,
    contato TEXT,
    status TEXT DEFAULT 'Aberto' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Ativa a segurança em nível de linha (RLS) exigida pelo Supabase
ALTER TABLE chamados ENABLE ROW LEVEL SECURITY;

-- Política 1: Permite que qualquer pessoa (anon) insira um novo chamado
CREATE POLICY "Permitir inserção pública" ON chamados
    FOR INSERT WITH CHECK (true);

-- Política 2: Permite que qualquer pessoa leia a lista de chamados
CREATE POLICY "Permitir leitura pública" ON chamados
    FOR SELECT USING (true);
    
-- Nota: Atualizações de status (UPDATE) e exclusões (DELETE) ficarão restritas no banco