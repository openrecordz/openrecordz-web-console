<?php
// Grab the uncached page contents
$cache_contents = ob_get_contents();

// Save it to the cache for next time
write_cache($cache_file, $cache_contents);
?>