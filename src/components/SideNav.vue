<template>
    <div class="relative flex min-h-screen space-y-6">
        <!-- sidebar -->
        <div class ="bg-blue text-cyan-100 w-64">
            <div class="flex items-center justify-center py-5 bg-lightblue/[0.24]">
                <img src="@/assets/marina_logo.svg" class="w-100"/>
            </div>
            <nav>
                <div class="py-2"></div>
                <a href="/" class="flex items-center py-4 px-4 space-x-3 hover:bg-lightblue/[0.24]">
                    <img src="@/assets/icons/overview.svg" class="h-6 w-6"/>
                    <span class="text-white text-sm font-extrabold">Overview</span>
                </a>
                <a href="/" class="flex items-center py-4 px-4 space-x-3 hover:bg-lightblue/[0.24]">
                    <img src="@/assets/icons/my_vessels.svg" class="h-6 w-6"/>
                    <span class="text-white text-sm font-extrabold">My Vessels</span>
                </a>
                <a href="/" class="flex items-center py-4 px-4 space-x-3 hover:bg-lightblue/[0.24]">
                    <img src="@/assets/icons/plan_voyage.svg" class="h-6 w-6"/>
                    <span class="text-white text-sm font-extrabold">Plan Voyage</span>
                </a>
            </nav>
            
        <!-- content -->
        </div>
        <!-- <div class="flex-1"> -->
            <!-- header -->
            <!-- <div class="bg-white shadow px-2 py-4">Header</div> -->
            <!-- content -->
            <!-- <div class="p-8 text-cyan-700 font-extrabold text-white">Content</div> -->
        <!-- </div> -->
    </div>
</template>

<script>
export default {};
</script>

<style>
    
</style>