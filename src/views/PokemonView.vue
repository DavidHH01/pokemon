<template>

    <body>
        <img :src="require('/pokemonlogo.png')" class="logo">
        <br>
        <div class="datos">
            <form action class="form" @submit.prevent="comprobar">
                <label class="nombrepok">Nombre o Id del Pokemon:</label>
                <input v-model="pokemonid" class="idpok" type="text" required id="poknom"
                    placeholder="ID o Nombre del Pokemon">
                <input class="buscar" type="submit" value="Buscar">
                <p v-if="error" class="error">Debes introducir un nombre o ID válido</p>
            </form>
        </div>
        <table v-if="buscado" class="table">
            <thead>
                <tr>
                    <th @click="ordenarID">ID</th>
                    <th @click="ordenarNombre">Nombre</th>
                    <th @click="ordenarExperiencia">Experiencia Base</th>
                    <th @click="ordenarAltura">Altura</th>
                    <th @click="ordenarPeso">Peso</th>
                    <th></th>
                    <th>Eliminar</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pokemon in arrayPokemon" :key="pokemon.identify">
                    <td v-text="pokemon.id"></td>
                    <td v-text="pokemon.nombre"></td>
                    <td v-text="pokemon.experiencia"></td>
                    <td v-text="pokemon.altura"></td>
                    <td v-text="pokemon.peso"></td>
                    <td><button @click="detalle(pokemon)">Seleccionar</button></td>
                    <td><button @click="removeTodo(pokemon)">X</button></td>
                </tr>
            </tbody>
        </table>
    </body>
</template>

<script>
import axios from "axios";
export default {
    data: () => ({
        pokemonid: "",
        info: null,
        error: false,
        buscado: false,
        arrayPokemon: [],
        repetido: false,
        tipo: ""
    }),
    methods: {
        async comprobar() {
            try {
                this.repetido = false;
                this.error = false;
                const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + this.pokemonid + "/");
                this.info = response.data;
                this.buscado = true;
                for (let i = 0; i < this.arrayPokemon.length; i++) {
                    if (this.arrayPokemon.length != 0) {
                        if (this.arrayPokemon[i].id === this.info.id) {
                            this.repetido = true;
                        }
                    }
                }
                if (!this.repetido) {
                    var pokemon = { id: this.info.id, nombre: this.info.name, experiencia: this.info.base_experience, altura: this.info.height, peso: this.info.weight };
                    this.arrayPokemon.push(pokemon);
                    this.pokemonid = "";
                    console.log(pokemon);
                }
            } catch (error) {
                console.log(error);
                this.error = true;
            }
        },
        ordenarID() {
            function compare(a, b) {
                if (a.id < b.id)
                    return -1;
                if (a.id > b.id)
                    return 1;
                return 0;
            }

            return this.arrayPokemon.sort(compare);
        },
        ordenarNombre() {
            function compare(a, b) {
                if (a.nombre < b.nombre)
                    return -1;
                if (a.nombre > b.nombre)
                    return 1;
                return 0;
            }

            return this.arrayPokemon.sort(compare);
        },
        ordenarExperiencia() {
            function compare(a, b) {
                if (a.experiencia < b.experiencia)
                    return -1;
                if (a.experiencia > b.experiencia)
                    return 1;
                return 0;
            }

            return this.arrayPokemon.sort(compare);
        },
        ordenarPeso() {
            function compare(a, b) {
                if (a.peso < b.peso)
                    return -1;
                if (a.peso > b.peso)
                    return 1;
                return 0;
            }

            return this.arrayPokemon.sort(compare);
        }, ordenarAltura() {
            function compare(a, b) {
                if (a.altura < b.altura)
                    return -1;
                if (a.altura > b.altura)
                    return 1;
                return 0;
            }

            return this.arrayPokemon.sort(compare);
        },
        removeTodo(pokemon) {
            this.arrayPokemon = this.arrayPokemon.filter((t) => t !== pokemon);
        },
        detalle(pokemon) {
            this.$router.push({ path: 'detalles', query: { id: pokemon.id } });
        }
    },
    watch: {
        arrayPokemon() {
            if (this.arrayPokemon.length == 0) {
                this.buscado = false;
            }
        }
    }
}
</script>

<style scoped lang="css">
.logo {
    height: 9%;
    width: 25%;
}

.form {
    margin: 3rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 20%;
    min-width: 350px;
    max-width: 100%;
    background: rgba(0, 117, 190, 1);
    border-radius: 5px;
    padding: 40px;
    box-shadow: 0 4px 10px 4px rgba(10, 40, 95, 0.6);
}

.nombrepok {
    text-align: left;
    margin-top: 2rem;
    color: #D5A100;
    margin-bottom: 0.5rem;
}

.idpok {
    padding: 10px 15px;
    border: 1px solid white;
    color: #0b9185;

    &:focus {
        outline: 0;
        border-color: #1ab188;
    }
}

.buscar {
    background: #FFCC00;
    margin-top: 3rem;
    padding: 1rem 0;
    cursor: pointer;
    transition: background 0.2s;
    border-color: #D5A100;

    &:hover {
        background: #0b9185;
    }
}

.error {
    margin: 1rem 0 0;
    color: #ff4a96;
}

table {
    margin: 3rem auto;
    border: 2px solid #0A285F;
    border-radius: 3px;
    background-color: #fff;
}

th {
    background-color: #0075BE;
    color: rgba(255, 255, 255, 0.66);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

td {
    background-color: #f9f9f9;
}

th,
td {
    min-width: 120px;
    padding: 10px 20px;
}

th.active {
    color: #fff;
}

th.active .arrow {
    opacity: 1;
}
</style>