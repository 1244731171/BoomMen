<template>
  <input type="text" id="text" v-model="txt" />
  <p>{{ site }}</p>
  <p>{{ url }}</p>
</template>
		<script>default {
				name: 'HelloWorld',
				data: {
					name: 'Google',
					url: 'http://www.google.com',
					txt: ""
				},
				watch: {
					txt: (nt)=>{
						alert(this.txt);
						this.url = nt
					}
				},
				computed: {
					site: {
						// getter
						get: function() {
							return this.name + '=>' + this.url
						},
						// setter
						set: function(newValue) {
							var names = newValue.split(' ') this.name = names[0] this.url = names[names.length - 1]
						}
					}
				}
			}
		</script>