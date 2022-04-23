require "language/node"
# @npmBrew [NpmCli](https://github.com/megabyte-labs/template-npm-cli) - A boilerplate / starting template for NPM CLI packages (using Nest Commander)
class NpmCli < Formula
  desc "A boilerplate / starting template for NPM CLI packages (using Nest Commander)"
  homepage "https://megabyte.space"
  url "https://registry.npmjs.org/@mblabs/npm-npm-cli/-/npm-npm-cli-0.0.1.tgz"
  sha256 ""
  license "MIT"

  

  depends_on "node" => :build

  def install
    system "npm", "install", *Language::Node.std_npm_install_args(libexec)
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    output = shell_output("#{bin}/@mblabs/npm-npm-cli --help 2>&1", 1)
    assert_match "You can log in via contentful login", output
    assert_match "Or provide a management token via --management-token argument", output
  end
end
