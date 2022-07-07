<script>
    import { onMount } from "svelte"
    import ky from "ky"

    export let images = [],
        pageSize = 10

    $: loading = true
    $: pageNumber = 1
    $: tableData = images.slice(
        (pageNumber - 1) * pageSize,
        pageNumber * pageSize
    )

    onMount(async () => {
        const response = await ky
            .get(`https://api.imgur.com/3/album/${IMGUR_ALBUM}`, {
                headers: {
                    Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
                },
            })
            .json()
        images = response.data.images.reverse()
        // loading = false
    })
</script>

<div class="row">
    <div class="col-md-3 text-center">
        <img
            src="https://raw.githubusercontent.com/redii/garden/main/assets/logo.png"
            alt="My Garden Logo"
            class="garden-logo"
        />
    </div>
    <div class="col-md-9">
        <h1>My Garden</h1>
        <p>
            Saw <a href="https://redd.it/vkuhvk">this</a>
            post on reddit and wanted to do it myself.
        </p>
        <p>
            But since my garding skills and reliability when it comes to plants
            are about <b>zero</b>, I wanted to automate that process.
        </p>
        <p>
            Read more about my garden project on
            <a href="https://github.com/redii/garden">Github</a>.
        </p>
    </div>
</div>
<hr class="mt-5 mb-5" />
{#if loading}
    <div class="d-flex justify-content-center">
        <div class="spinner-border mt-5" role="status" />
    </div>
{:else if !images.length}
    <div class="row">
        <div class="col">
            <h2>No image taken yet... 👀</h2>
        </div>
    </div>
{:else}
    <div class="row">
        <div class="col-md-12 col-lg-8 mb-5">
            <h2>📸 Latest Image</h2>
            <p>
                {new Date(images[0].datetime * 1000).toLocaleDateString(
                    "de-DE",
                    {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                    }
                )}
            </p>
            <img src={images[0].link} alt="Latest" class="latest-image" />
        </div>
        <div class="col-md-12 col-lg-4">
            <p class="text-center">
                <b>{images.length}</b> images taken since {new Date(
                    images[images.length - 1].datetime * 1000
                ).toLocaleDateString("de-DE", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                })}
            </p>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Timestamp</th>
                        <th scope="col">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {#each tableData as image}
                        <tr>
                            <th scope="row">{image.id}</th>
                            <td>
                                {new Date(
                                    image.datetime * 1000
                                ).toLocaleDateString("de-DE", {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </td>
                            <td>
                                <a
                                    href={image.link}
                                    alt={image.title}
                                    target="_blank"
                                >
                                    ➡️
                                </a>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
            <nav style="float:left">
                <ul class="pagination">
                    <li class="page-item">
                        <button
                            class="page-link"
                            href="#"
                            aria-label="Previous"
                            on:click={() => (pageNumber = pageNumber - 1)}
                        >
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    <li class="page-item">
                        <input
                            class="pagination-input"
                            type="number"
                            name="page"
                            min={1}
                            max={Math.ceil(images.length / pageSize)}
                            bind:value={pageNumber}
                        />
                    </li>
                    <li class="page-item">
                        <button
                            class="page-link"
                            href="#"
                            aria-label="Next"
                            on:click={() => (pageNumber = pageNumber + 1)}
                        >
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
            <div style="float: right; line-height: 38px">
                {Math.ceil(images.length / pageSize)} pages
            </div>
        </div>
    </div>
{/if}

<style>
    .garden-logo {
        width: 100%;
        max-width: 175px;
    }

    @media only screen and (max-width: 767px) {
        .garden-logo {
            margin-bottom: 2em;
        }
    }

    .latest-image {
        max-width: 100%;
        border: 2px solid black;
        border-radius: 6px;
    }

    table a {
        text-decoration: none;
    }

    .pagination-input {
        border: 1px solid #dee2e6;
        border-left: none;
        border-right: none;
        border-radius: none;
        padding: 6px 12px;
        width: 64px;
        text-align: center;
        -moz-appearance: textfield;
    }

    .pagination-input::-webkit-outer-spin-button,
    .pagination-input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
