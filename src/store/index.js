import { createStore } from 'vuex';
import { auth, usersCollection, } from '/src/includes/firebase';
import { Howl } from 'howler';

export default createStore({
    state:{
        authModalShow:false,
        userLoggedIn:false,
        currentSong: {},
        sound:{},
        theme: 'light'
    },
    mutations:{
        toggleAuthModal: (state) => {
            state.authModalShow = !state.authModalShow;
        },
        toggleAuth(state) {
            state.userLoggedIn = !state.userLoggedIn
        },
        newSong(state, payload) {
            state.currentSong = payload;
            state.sound = new Howl({
                src: [payload.url],
                html5:true,
            });
        },
        toggleTheme(state) {
            state.theme == 'light' ? 'light': 'dark'
        }
        
    },
    getters: {
        authModalShow: (state) => {
            // return state.authModalShow
        },
        playing: (state) => {
            if(state.sound.playing) {
                return state.sound.playing();
            }

            return false
        }
    },
    actions:{
        
        async register({commit}, payload) {
            const userCred = await auth.createUserWithEmailAndPassword( payload.email, payload.password );

        
            await usersCollection.doc(userCred.user.uid).set({
                name: payload.name,
                email: payload.email,
                age: payload.age
            });

            await userCred.user.updateProfile({
                displayName: payload.name
            })

            commit('toggleAuth')

        },
        async login({ commit }, payload) {
            await auth.signInWithEmailAndPassword(payload.email, payload.password)

            commit('toggleAuth')
        },

        init_login({commit}) {
            const user = auth.currentUser;

            if(user) {
                commit('toggleAuth')
            }
        },

        async signout({commit}) {
            await auth.signOut();

            commit('toggleAuth')
        },

        async newSong({commit, state}, payload) {
            commit('newSong', payload);
             
             state.sound.play();
             Howler.volume(0.2);
        },
        async toggleAudio({state}) {
            if(!state.sound.playing) {
                return;
            }

            if(state.sound.playing()) {
                state.sound.pause();
            } else {
                state.sound.play();
            }
        },
        toggleTheme({commit, state}) {
        //    if(!state.theme == 'light') {
        //         document.
        //    }
        }
    },
    modules:{},
});