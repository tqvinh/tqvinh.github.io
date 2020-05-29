<template>
<div id="main">
    <div v-for="(item, index) in scrambledCards" :key="index" class="flipCard" :id="generateId('mycard',index)" :class="generatePair('card',item.id)" @click="checkPair(item.id, index)" style="background-image: url('src/assets/back.png');background-size:cover">

    </div>
</div>
</template>

<script>
import Swal from 'sweetalert2';
import '../../node_modules/sweetalert2/dist/sweetalert2.min.css';
var point = 0;
export default {
    name: 'mainBoard',
    data() {
        return {
            lstCard: [{
                    id: 1,
                    path: 'src/assets/image (1).jpg'
                },
                {
                    id: 2,
                    path: 'src/assets/image (2).jpg'
                },
                {
                    id: 3,
                    path: 'src/assets/image (3).jpg'
                },
                {
                    id: 4,
                    path: 'src/assets/image (4).jpg'
                },
                {
                    id: 5,
                    path: 'src/assets/image (5).jpg'
                },
                {
                    id: 6,
                    path: 'src/assets/image (6).jpg'
                },
                {
                    id: 7,
                    path: 'src/assets/image (7).jpg'
                },
                {
                    id: 8,
                    path: 'src/assets/image (8).jpg'
                },
                {
                    id: 9,
                    path: 'src/assets/image (9).jpg'
                },
                {
                    id: 10,
                    path: 'src/assets/image (10).jpg'
                },
                {
                    id: 11,
                    path: 'src/assets/image (11).jpg'
                },
                {
                    id: 12,
                    path: 'src/assets/image (12).jpg'
                },
                {
                    id: 13,
                    path: 'src/assets/image (13).jpg'
                },
                {
                    id: 14,
                    path: 'src/assets/image (14).jpg'
                },
                {
                    id: 15,
                    path: 'src/assets/image (15).jpg'
                },
                {
                    id: 16,
                    path: 'src/assets/image (16).jpg'
                }
            ],
            scrambledCards: [],
            openedId: 0,
            openedIndex: -1
        }
    },
    created() {
        this.lstCard=this.shuffle(this.lstCard);
        this.scrambledCards = this.lstCard.slice(0,12).concat(this.lstCard.slice(0,12));
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
            var openedCard = document.getElementById("mycard" + index);
            openedCard.style.transform = 'rotatey(-180deg)';
            openedCard.style.backgroundImage = "url('" + this.scrambledCards[index].path + "')";

            //logic
            if (this.openedId == 0 && this.openedIndex == -1) {
                this.openedId = id;
                this.openedIndex = index;
            } else {
                // already opened a card
                if (index == this.openedIndex) {
                    //do nothing
                } else {
                    if (id == this.openedId) {
                        // increase point
                        var openedCards = document.getElementsByClassName("card" + id);
                        openedCards[0].style.visibility = 'hidden';
                        openedCards[1].style.visibility = 'hidden';
                        this.openedId = 0;
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
                        var openedCard1 = document.getElementById("mycard" + index);
                        var openedCard2 = document.getElementById("mycard" + this.openedIndex);
                        setTimeout(function () {
                            openedCard1.style.transform = 'rotatey(-360deg)';
                            openedCard1.style.backgroundImage = "url('src/assets/back.png')";
                            openedCard2.style.transform = 'rotatey(-360deg)';
                            openedCard2.style.backgroundImage = "url('src/assets/back.png')";
                        }, 1000);
                        this.openedId = 0;
                        this.openedIndex = -1;
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
