<main>
	<a href="https://github.com/redii/garden" alt="Github Project">
		<div class="github-badge">
			<img src="github.jpeg" alt="Github Logo" />
		</div>
	</a>
	<div class="container">
		<slot />
	</div>
</main>

<style>
	main {
		font-family: 'Helvetica', 'Arial';
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
		width: 40px;
		position: relative;
		top: 100px;
		left: 55px;
	}
</style>
