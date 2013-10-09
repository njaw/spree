#!/bin/bash
BRANCH='master'
HERE=`pwd`
cd ~/Projects/gems/spree
git checkout $BRANCH
cd ~/Projects/gems/spree_auth_devise
git checkout $BRANCH
cd ~/Projects/gems/spree_gateway
git checkout $BRANCH
cd $HERE
bundle check || bundle update
