const { ApolloServer, gql } = require('apollo-server')

const usuarios = [{
    id: 1,
    nome: "Alberto",
    email: "beto@email.com",
    idade: 40,
    salario: 1600,
    vip: false
},
{
    id: 2,
    nome: "Bernardo",
    email: "beernardo@email.com",
    idade: 28,
    salario: 2800,
    vip: true
},
{
    id: 3,
    nome: "Carlos",
    email: "carlao@email.com",
    idade: 50,
    salario: 3000,
    vip: false
},
{
    id: 4,
    nome: "Diego",
    email: "didi@email.com",
    idade: 24,
    salario: 1100,
    vip: true
}]

const typeDefs = gql`
    scalar Date

    type Produto {
        nome: String!
        preco: Float!
        desconto: Int
        precoComDesconto: Float                
    }

    type Usuario {
        id: ID
        nome: String
        email: String
        idade: Int
        salario: Float
        vip: Boolean
    }

    #Ponto de entrada da API
    type Query {
        health: String!
        getdate: Date!
        usuarioLogado: Usuario 
        produto: Produto
        numeroMegacena: [Int!]!
        usuarios: [Usuario]!
        usuario(id: ID): Usuario
    }
`

const resolvers = {
    Produto: {
        precoComDesconto(produto) {
            return produto.preco - (produto.preco * (produto.desconto / 100))
        }
    },
    Usuario: {
        salario(usuario) {
            return usuario.salario_real
        }
    },
    Query: {
        health() {
            return "Hello World!"
        },
        getdate() {
            return new Date
        },
        usuarioLogado() {
            return {
                id: 1,
                nome: "Alexandre",
                email: "email@email.com",
                idade: 20,
                salario_real: 2000.00,
                vip: true
            }
        },
        produto() {
            return {
                nome: "Playstation 5",
                preco: 4300,
                desconto: 50
            }
        },
        numeroMegacena() {
            const crescente = (a, b) => a - b;

            return Array(6).fill(0)
                .map(n => parseInt(Math.random() * 60 + 1))
                .sort(crescente);
        },
        usuarios() {
            return usuarios;
        },
        usuario(_, { id }) {
            const selecionado = usuarios.filter(u => u.id == id);
            return selecionado ? selecionado[0] : null;
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`listening on ${url}`)
})