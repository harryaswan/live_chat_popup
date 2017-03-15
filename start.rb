pid = spawn("node .server/server.js", :out => "./test/test.out", :err => "./test/test.err")
Process.detach(pid)
File.write('kill.rb', "exec \"kill #{pid} && rm kill.rb\"")
puts "Started in process #{pid}. To end run 'ruby kill.rb'"
