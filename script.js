// ==UserScript==
// @name         Readwok To Markdown
// @namespace    https://app.readwok.com/
// @version      2024-04-08
// @description  Convert Highlights or Paragraphs dump to markdown
// @author       Asayake
// @match        https://app.readwok.com/r/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=readwok.com
// @grant        GM.setClipboard
// ==/UserScript==

function fixthing(str) {
    return str.replaceAll(/ (.*?) .*? /g, "$1");
}

function makeMD(text, link) {
    let makeLink = document.getElementById("makelink").checked;
    if (makeLink === false) {
        return `- ${text}`;
    } else {
        return `- [${text}](${link})`
    }
}




(function() {
    'use strict';
    let added = 0;

    function findHeader(records) {
        for (const record of records) {
            if (record.type == "childList" && record.target.classList == "styles_rightside__SBzL8" && added == 0) {
                const paragraph_svg = `<svg width="1.5em" height="1.5em" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13 1.5H6.5C4.29086 1.5 2.5 3.29086 2.5 5.5C2.5 7.70914 4.29086 9.5 6.5 9.5H7.5M10.5 14V1.5M7.5 14V1.5" stroke="#595e63"></path> </g></svg>`

                const highlight_svg = `<svg width="1.5em" height="1.5em" viewBox="0 0 512 512" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" stroke="#000000" transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>highlight</title> <g id="Page-1" stroke-width="0.00512" fill="none" fill-rule="evenodd"> <g id="drop" fill="#595e63" transform="translate(64.000000, 44.956885)"> <path d="M405.333333,381.709781 L362.666667,424.376448 L85.3333333,424.376448 L128,381.709781 L405.333333,381.709781 Z M282.327442,7.10542736e-15 L403.006999,120.679557 L384.970948,143.928809 L352.415716,185.42913 L333.317316,209.393653 L316.302987,230.396289 L304.909911,244.204529 L291.542704,260.023864 L282.884971,269.944627 L275.399527,278.199329 L269.086373,284.787971 L254.094195,299.615469 L223.246131,330.913053 L206.971557,347.655494 L201.097332,347.365048 L194.94444,347.269241 C184.457401,347.271762 172.809254,348.085275 160,349.709781 L151.970104,350.837434 L144.123951,352.129117 L136.61735,353.518237 L126.334944,355.638938 L106.666667,360.376448 L42.6666667,392.376448 L1.42108547e-14,403.043115 L10.6666667,360.376448 L42.6666667,296.376448 L43.6781629,293.970042 L45.4668727,289.038094 L46.9677202,284.280153 L48.6019332,278.358143 C50.270448,271.857501 51.9932963,263.626067 53.3333333,253.709781 C55.8645145,234.979019 56.7941068,216.011107 56.1221103,196.806047 L59.4284876,193.08414 L62.8024546,189.492637 L78.5389897,173.389008 L116.39305,135.764502 L128.060065,124.568671 L141.033549,112.687653 L152.352994,102.689504 L164.50858,92.2528346 L177.500305,81.3776459 L191.328171,70.0639374 L205.992177,58.3117091 L229.55595,39.8611422 L246.310307,27.0126145 L263.900804,13.7255671 L282.327442,7.10542736e-15 Z M98.2491614,232.79585 C97.9559598,237.447641 97.5768923,242.08805 97.1119193,246.716812 L95.6156779,259.423605 C94.6195581,266.7949 93.4216694,273.638856 92.0665399,279.972262 L87.7883357,298.089846 L106.435281,315.212199 L124.845508,312.355266 C135.006153,310.301434 145.001214,308.603546 154.631889,307.382156 C160.282804,306.665491 165.770852,306.085382 171.099187,305.644179 L98.2491614,232.79585 Z M278.293333,56.312448 L272.274533,60.8697171 L247.868843,79.6578618 L232.674928,91.6054817 L218.346317,103.086115 L204.887227,114.094629 L192.302682,124.624617 L180.598706,134.668 L169.782552,144.214456 L156.548615,156.344005 L146.471044,166.026008 L119.059,193.266 L209.655,283.862 L215.23475,278.178375 L234.212668,259.239604 L238.2793,255.269016 L243.792887,249.538123 L250.73823,241.890545 L258.952887,232.48574 L271.99948,217.050376 L283.149955,203.53887 L299.950576,182.802205 L318.845645,159.094841 L346.197333,124.216448 L278.293333,56.312448 Z" id="Combined-Shape"> </path> </g> </g> </g></svg>`



                const highlights = document.createElement('button');
                highlights.classList = "btn btn-";
                highlights.innerHTML = highlight_svg;
                highlights.onclick = function() {
                    let h = "";
                    document.querySelector("button[title=\"Bookmarks\"]").click()
                    document.querySelector("a[title=\"Highlights\"]").click()
                    document.querySelectorAll("table.styles_itemsList__TBKRG a").forEach(a => {
                        let div = a.querySelectorAll("div");
                        let text = fixthing(div[2].innerText);
                        let link = a.href;
                        h += ` ${makeMD(text, link)} \n`
                    })
                    GM.setClipboard(h);
                }

                const para = document.createElement('button');
                para.classList = "btn btn-";
                para.innerHTML = paragraph_svg;
                para.onclick = function() {
                    let p = "";
                    document.querySelector("button[title=\"Expand all\"]").click();
                    document.querySelectorAll("table.styles_itemsList__rk75x a").forEach(a => {
                        let span = a.querySelector("span.text-dark");
                        let text = fixthing(span.innerText);
                        let link = a.href;
                        p += ` ${makeMD(text, link)} \n`
                    })
                    GM.setClipboard(p);
                }

                const checkbox = document.createElement("input");
                checkbox.classList = "btn btn-";
                checkbox.id = "makelink";
                checkbox.type = "checkbox";

                document.querySelector(".styles_headerInner__pGYe6").appendChild(highlights);
                document.querySelector(".styles_headerInner__pGYe6").appendChild(para);
                document.querySelector(".styles_headerInner__pGYe6").appendChild(checkbox);


                added = 1;
            }
        }
    }

    const observer = new MutationObserver(findHeader);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
