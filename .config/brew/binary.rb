# @binaryBrew [NpmCli](https://github.com/megabyte-labs/template-npm-cli) - A boilerplate / starting template for NPM CLI packages (using Nest Commander)
class NpmCli < Formula
  desc "A boilerplate / starting template for NPM CLI packages (using Nest Commander)"
  homepage "https://megabyte.space"
  url "https://github.com/megabyte-labs/template-npm-cli/releases/download/v0.0.1/npm-cli.tar.gz"
  version "0.0.1"
  license "MIT"

  

  def install
    os = OS.kernel_name.downcase
    arch = Hardware::CPU.intel? ? "amd64" : Hardware::CPU.arch.to_s
    bin.install "build/bin/npm-cli-#{os}_#{arch}" => "npm-cli"
  done

  test do
    system bin/"npm-cli", "--version"
  end
end
