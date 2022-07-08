 <template>
    <div>
        <button @click="regresar" class="bvolver">Volver</button>
        <br>
        <div>
            <img src="https://i.pinimg.com/736x/6e/52/e0/6e52e0a37e4194b7766ffbde181a0434.jpg" class="fondo">
            <div>
                <img class="foto" :src="nombreImg">
            </div>
        </div>

        <table class="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Experiencia Base</th>
                    <th>Altura</th>
                    <th>Peso</th>
                    <th colspan="2">Tipo/s</th>
                    <th colspan="4">Habilidad Base</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="pokemon in arrayPokemon" :key="pokemon.identify">
                    <td v-text="pokemon.id"></td>
                    <td v-text="pokemon.nombre"></td>
                    <td v-text="pokemon.experiencia"></td>
                    <td v-text="pokemon.altura"></td>
                    <td v-text="pokemon.peso"></td>
                    <td v-for="tipo in tiposPok" :key="tipo">{{ tipo.type.name }}</td>
                    <td v-for="ability in abilitiesPok" :key="ability">{{ ability.ability.name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import axios from "axios";
export default {

    data: () => ({
        result: "",
        arrayPokemon: [],
        tiposPok: [],
        abilitiesPok: [],
        nombreImg: ""
    }),
    methods: {
        regresar() {
            window.history.back();
        },
    },
    async mounted() {
        let response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + this.$route.query.id + "/");
        this.result = response.data;
        this.nombreImg = this.result.sprites.front_default;
        var pokemon = { id: this.result.id, nombre: this.result.name, experiencia: this.result.base_experience, altura: this.result.height, peso: this.result.weight };
        this.tiposPok = this.result.types;
        this.abilitiesPok = this.result.abilities;
        this.arrayPokemon.push(pokemon);
    }
}
</script>

<style scoped>
.bvolver {
    background: #FFCC00;
    color: #0A285F;
    margin-top: 3rem;
    margin-right: 100rem;
    position: relative;
    padding: 1rem 2rem;
    cursor: pointer;
    transition: background 0.2s;
    border-color: #D5A100;

    &:hover {
        background: #0b9185;
    }
}

table {
    margin: 3rem 1rem;
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
    min-width: 50px;
    padding: 10px 20px;
}

th.active {
    color: #fff;
}

th.active .arrow {
    opacity: 1;
}

.foto {
    position: absolute;
    z-index: 0;
    width: 20%;
    height: 30%;
    margin-left: 22rem;
    margin-top: 8rem;
    transform: translateY(-10%);
    animation: floater 1.5s infinite;
    transition: ease 0.5s;
}

.fondo {
    z-index: -2;
    position: absolute;
    width: 25%;
    height: 70%;
    margin-left: 19rem;
    margin-bottom: 30rem;
}

@keyframes floater {
    0% {
        box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0);
        transform: translatey(0px);
    }

    50% {
        box-shadow: 0 25px 15px 0px rgba(0, 0, 0, 0);
        transform: translatey(-5px);
    }

    100% {
        box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0);
        transform: translatey(0px);
    }
}
</style>
