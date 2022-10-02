<script>
	export let fileInfo;
	export let frameInfo;
	const niceNumber = (n, radixPoint) => {
		const string = n.toFixed(radixPoint);
		const parsed = parseFloat(string);
		return parsed === Math.floor(parsed)
			? `${parsed}`
			: string;
	}
	const formatDimensions = (point) => point
		.map(n => niceNumber(n, 3))
		.join(" × ");
</script>

<div>
	<h3>
		file analysis
	</h3>
	<p>
		{#if frameInfo.verticesDimensions}
			<span>{frameInfo.verticesDimensions.map(n => `${n}D`).join(" & ")} vertices,</span>
		{/if}
		{#if frameInfo.bounds}
			dimensions: {formatDimensions(frameInfo.bounds.span)}
		{/if}
	</p>
	<p>
		{frameInfo.count.vertices} vertices,
		{frameInfo.count.edges} edges,
		{frameInfo.count.faces} faces,
		{frameInfo.count.faceOrders} layer orders
	</p>
</div>

<style>
div {
	text-align: left;
	margin: auto;
}
</style>
