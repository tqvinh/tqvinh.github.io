<template>
<div id="main">
    <div v-for="(item, index) in scrambledCards" :key="index" class="flipCard">
        <div class="front" :id="generateId('myfront',index)" :class="generatePair('front',item.id)" @click="checkPair(item.id, index)" style="z-index:2;"></div>
        <div class="back" :id="generateId('myback',index)" :class="generatePair('back',item.id)" @click="checkPair(item.id, index)" style="z-index:1;" :style="{'background-image':'url('+item.path+')'}"></div>
    </div>
</div>
</template>

<script>
import Swal from 'sweetalert2';
import '../../node_modules/sweetalert2/dist/sweetalert2.min.css';
import '../data/path.js';
import {
    friendsPath,
    heroesPath,
    doraemonPath,
    dragonballPath,
    onepunchmanPath,
    marvelPath
} from '../data/path.js';
var point = 0;
export default {
    name: 'mainBoard',
    data() {
        return {
            lstCard: [],
            scrambledCards: [],
            openedId: -1,
            openedIndex: -1
        }
    },
    created() {
        window.scrollTo({
            top: 0
        });
        //Get path pist by router
        switch (this.$route.params.category) {
            case 'myfriends':
                this.lstCard = friendsPath();
                break;
            case 'aov':
                this.lstCard = heroesPath();
                break;
            case 'doraemon':
                this.lstCard = doraemonPath();
                break;
            case 'dragonball':
                this.lstCard = dragonballPath();
                break;
            case 'onepunchman':
                this.lstCard = onepunchmanPath();
                break;
            case 'marvel':
                this.lstCard = marvelPath();
                break;
            default:
                this.lstCard = friendsPath();
        }

        this.lstCard = this.shuffle(this.lstCard);
        this.scrambledCards = this.lstCard.slice(0, 12).concat(this.lstCard.slice(0, 12));
        this.scrambledCards = this.shuffle(this.scrambledCards);

    },
    methods: {
        shuffle(array) {
            var currentIndex = array.length,
                temporaryValue, randomIndex;

            // While there remain elements to shuffle...
            while (0 !== currentIndex) {

                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;

                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }

            return array;
        },
        generatePair(prefix, id) {
            return prefix + id;
        },
        generateId(prefix, index) {
            return prefix + index;
        },
        checkPair(id, index) {
            //flip
            var openedCardFront = document.getElementById("myfront" + index);
            var openedCardBack = document.getElementById("myback" + index);
            if (openedCardFront.style.zIndex == 2) {
                openedCardFront.style.transform = 'rotatey(-180deg)';
                openedCardBack.style.transform = 'rotatey(-180deg)';
                openedCardFront.style.zIndex = 1;
                openedCardBack.style.zIndex = 2;
            }
            //logic
            if (this.openedId == -1 && this.openedIndex == -1) {
                this.openedId = id;
                this.openedIndex = index;
            } else {
                // already opened a card
                if (index == this.openedIndex) {
                    //do nothing
                } else {
                    if (id == this.openedId) {
                        // increase point
                        var openedCardsFront = document.getElementsByClassName("front" + id);
                        var openedCardsBack = document.getElementsByClassName("back" + id);
                        openedCardsFront[0].style.visibility = 'hidden';
                        openedCardsFront[1].style.visibility = 'hidden';
                        openedCardsBack[0].style.visibility = 'hidden';
                        openedCardsBack[1].style.visibility = 'hidden';
                        this.openedId = -1;
                        this.openedIndex = -1;
                        point += 1;
                        if (point == 12) {
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Good job!',
                                showConfirmButton: false,
                                timer: 3000
                            });
                            setTimeout(function () {
                                location.reload();
                            }, 2500);

                        }
                    } else {
                        // false, close both card
                        var openedCardFront1 = document.getElementById("myfront" + index);
                        var openedCardBack1 = document.getElementById("myback" + index);
                        var openedCardFront2 = document.getElementById("myfront" + this.openedIndex);
                        var openedCardBack2 = document.getElementById("myback" + this.openedIndex);
                        this.openedId = -1;
                        this.openedIndex = -1;
                        setTimeout(function () {
                            openedCardFront1.style.transform = 'rotatey(0deg)';
                            openedCardBack1.style.transform = 'rotatey(0deg)';
                            openedCardFront1.style.zIndex = 2;
                            openedCardBack1.style.zIndex = 1;
                            openedCardFront2.style.transform = 'rotatey(0deg)';
                            openedCardBack2.style.transform = 'rotatey(0deg)';
                            openedCardFront2.style.zIndex = 2;
                            openedCardBack2.style.zIndex = 1;
                        }, 800);
                    }
                }
            }
        }
    }
}
</script>

<style>
@import '../styles/main.css';
</style>
