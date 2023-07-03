import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environmentMatchGlobs:[
            ["src/http/controllers/**","prisma"] // Aqui estamos definindo que todos os testes executados dentro de controllers devem ser executados com o ambiente prisma que finimos em vitest-environment-prisma
        ]
    }
})