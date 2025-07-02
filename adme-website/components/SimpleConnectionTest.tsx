  // Step 3: Test database connection
  const { error: profileError } = await supabase
    .from('profiles')
    .select('count', { count: 'exact', head: true })
} catch (error: unknown) {
  // ... existing code ...
} 