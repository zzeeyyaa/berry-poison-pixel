const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
let supabaseUrl, supabaseKey;
env.split('\n').forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = line.split('=')[1].trim().replace(/['"]/g, '');
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=')) supabaseKey = line.split('=')[1].trim().replace(/['"]/g, '');
});

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(1);

  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Columns available:", Object.keys(data[0] || {}));
  }
}

checkSchema();
