<script>
    import Content from "./Content.svelte"
</script>

<main>
    <a href="https://github.com/redii/garden" alt="Github Project">
        <div class="github-badge">
            <img
                src="https://raw.githubusercontent.com/redii/garden/main/assets/github.jpeg"
                alt="Github Logo"
            />
        </div>
    </a>
    <div class="container">
        <Content />
    </div>
</main>
<footer class="text-center">
    made with <span class="emoji">❤️</span>
</footer>

<style>
    main {
        font-family: "Helvetica", "Arial";
        min-height: calc(100vh - 50px);
        height: 100%;
        position: relative;
        overflow: hidden;
        padding: 3em 0;
    }

    .github-badge {
        width: 150px;
        height: 150px;
        position: absolute;
        right: -75px;
        top: -75px;
        transform: rotate(45deg);
        background-color: black;
    }

    .github-badge img {
        position: relative;
        top: 100px;
        left: 55px;
        width: 40px;
    }

    footer {
        width: 100vw;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
    }

    footer .emoji {
        position: relative;
        bottom: 1px;
        font-size: 10px;
    }
</style>
