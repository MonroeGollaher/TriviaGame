(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c577c"],{"3ee9":function(e,t,c){"use strict";c.r(t);var a=c("7a23");const n=Object(a["J"])("data-v-2bc4a527");Object(a["v"])("data-v-2bc4a527");const i={class:"TeamJoinGame container-fluid align-items-center"},o=Object(a["i"])("div",{class:"row justify-content-center align-items-center"},[Object(a["i"])("div",{class:"col-12 col-lg-6"},[Object(a["i"])("h3",{class:"font-weight-bold"}," Join A Game ")])],-1),s={class:"row justify-content-center align-items-center"},l={class:"col-12 col-lg-6"},m=Object(a["i"])("p",null," Please enter team name & room code ",-1),r={class:"p-2"},b={class:"p-2"},p=Object(a["i"])("div",{class:"p-2"},[Object(a["i"])("button",{type:"submit",class:"btn btn-success"}," Join ")],-1);Object(a["t"])();const d=n((function(e,t,c,n,d,j){return Object(a["s"])(),Object(a["e"])("div",i,[o,Object(a["i"])("div",s,[Object(a["i"])("div",l,[m,Object(a["i"])("form",{onSubmit:t[3]||(t[3]=Object(a["I"])(e=>n.joinGame(),["prevent"]))},[Object(a["i"])("div",r,[Object(a["H"])(Object(a["i"])("input",{type:"text",placeholder:"Team Name","onUpdate:modelValue":t[1]||(t[1]=e=>n.state.profile.teamName=e)},null,512),[[a["E"],n.state.profile.teamName]])]),Object(a["i"])("div",b,[Object(a["H"])(Object(a["i"])("input",{type:"text",placeholder:"Room Pin","onUpdate:modelValue":t[2]||(t[2]=e=>n.state.profile.roomPin=e)},null,512),[[a["E"],n.state.profile.roomPin]])]),p],32)])])])}));var j=c("d2ca"),u=c("8a4e"),O=c("6c02"),v={name:"TeamJoinGame",setup(){const e=Object(a["w"])({profile:{}}),t=Object(O["e"])();return{state:e,async joinGame(){const c=await j["a"].joinGame(e.profile);u["a"].log(c),t.push({name:"ActiveGamePage",params:{gameId:c.currentGame}})}}},components:{}};v.render=d,v.__scopeId="data-v-2bc4a527";t["default"]=v}}]);