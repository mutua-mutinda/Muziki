//obj syntax

export default {
    beforeMount(el, binding) {
        let iconClass = `fa fa-${binding.value.icon} text-xl`

        if(binding.value.right) {
            iconClass += ' float-right';
        }

        if(binding.value.amber) {
            iconClass += ' text-amber-400';
        } else {
            iconClass += ' text-emerald-400';
        }
        // eslint-disable-next-line no-param-reassign
        el.innerHTML += `<i class="${iconClass}"></i>`
    }
}