// ==UserScript==
// @name         YouTube Auto Loop + Next Video (No Enhancer)
// @icon         https://www.google.com/s2/favicons?sz=64&domain=youtube.com
// @namespace    https://github.com/CYNOXREAL
// @version      1.0
// @description  Auto loop videos and add R/N shortcuts without Enhancer for YouTube
// @author       CYNOXREAL
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let lastVideo = null;

    function showToast(text) {
        let toast = document.createElement('div');
        toast.textContent = text;
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.75);
            color: #fff;
            padding: 10px 20px;
            border-radius: 6px;
            font-size: 18px;
            z-index: 9999;
            pointer-events: none;
            font-family: sans-serif;
            text-align: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 1200);
    }

    function enableLoop(video) {
        if (video && video !== lastVideo) {
            lastVideo = video;
            video.loop = true;
            showToast('Loop ON');
        }
    }

    function toggleLoop() {
        const video = document.querySelector('video');
        if (video) {
            video.loop = !video.loop;
            showToast(video.loop ? 'Loop ON' : 'Loop OFF');
        }
    }

    function clickNextVideo() {
        const nextBtn = document.querySelector('.ytp-next-button');
        if (nextBtn) {
            nextBtn.click();
            showToast('Next Video');
        }
    }

    document.addEventListener('keydown', (e) => {
        if (!e.target.matches('input, textarea')) {
            if (e.key.toLowerCase() === 'r') {
                toggleLoop();
            }
            if (e.key.toLowerCase() === 'n') {
                clickNextVideo();
            }
        }
    });

    const observer = new MutationObserver(() => {
        const video = document.querySelector('video');
        if (video) {
            enableLoop(video);
        }
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
