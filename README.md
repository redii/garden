<img src="assets/logo.png" alt="Logo" width="300" />

# 🪴 My Garden

Saw [this](https://www.reddit.com/r/interestingasfuck/comments/vkuhvk/time_lapse_of_a_pepper/) post on reddit and wanted to do it myself. But since my garding skills and reliability when it comes to plants are about 0, I had to automate that process.

## Requirements
- [Raspberry Pi 3](https://www.raspberrypi.com/products/raspberry-pi-3-model-b/)
- [Camera](https://www.amazon.de/gp/product/B07KSZW251)
- [Waterpump and tubes](https://www.amazon.de/gp/product/B082PM8L6X)
- SD card, dirt, seeds, case...

## Preparation
I installed Ubuntu Server on the Raspberry Pi to be able to run my node scripts - could have done this using a microcontroller but im more familiar with linux and higher level programming languages so I used the Raspberry Pi which was laying around for years. Afterwards I installed the latest node version using [nvm](https://github.com/nvm-sh/nvm) and was ready to go scripting. 

## ✍️ Scripts
### Waterpump
...

The script can be found [here](scripts/waterpump.js).

### Timelapse
The raspberry pi itself is capable of doing a timelapse using the `raspistill` command. But since I also wanted to store the images in a database (to be able to display them later on the website), I self automated this process of taking pictures using a node script.

The script can be found [here](scripts/timelapse.js).

## 🛠 Installation
...

## 🌐 Website
I wanted to provide a website where I can take a look at my plants whenever I want. But I also wanted the hole project to be selfcontained and dont have any dependencies for external services such as databases or image hosting. So in order to run that website I used sqlite and a local webserver on the pi, which is accessible via an external port forwarding from the internet.



